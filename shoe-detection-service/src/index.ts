import express, { Request, Response } from 'express';
import * as tf from '@tensorflow/tfjs-node';
import sharp from 'sharp';
import multer from 'multer';
import { shoeInfo } from '../constants/shoeInfo';

const upload = multer({storage: multer.memoryStorage()})
const app = express();
const port = 3000;

app.use(express.json());

interface L2Config {
  l2: number;
}

class L2 {
  static className = 'L2';

  constructor(config: L2Config) {
    return tf.regularizers.l1l2(config);
  }

  static fromConfig(cls: any, config: any) {
    return new cls(config);
  }
}
tf.serialization.registerClass(L2);

async function loadModel() {
  try {
    const model = await tf.loadLayersModel(
      'file:///Users/leesingchan/Documents/React-Native/computer-vision-app/shoe-detection-service/models/jordan_model/model.json'
    );
    return model;
  } catch (error) {
    console.error('Error loading model:', error);
    throw error; // Rethrow the error to propagate it further
  }
}

async function loadImage(image: Buffer) {
   const imageBuffer = await sharp(image)
     .resize(180, 180)
     .toFormat('png')
     .toBuffer();
   const imageTensor = tf.node
     .decodeImage(imageBuffer, 3)
     .reshape([1, 180, 180, 3]);
   return imageTensor;
}

async function predictImage(imagePath: Buffer) {
  const model = await loadModel();
  const imageTensor = await loadImage(imagePath);
  const prediction = model.predict(imageTensor) as tf.Tensor;
  const predictionData = await prediction.data(); 
  let maxPrediction = [0,0];
  for(let key in predictionData) {
    if(!maxPrediction || predictionData[key] > maxPrediction[1]) {
      maxPrediction = [parseInt(key), predictionData[key]];
    }
  }
  const response = {
    shoeName: shoeInfo[maxPrediction[0]].name,
    description: shoeInfo[maxPrediction[0]].description,
    confidence: maxPrediction[1],
  };
  return response;
}


app.post('/detect', upload.single('shoeImage'), async (req: Request, res: Response) => {
  if(!req.file) {
    res.status(400).send({ error: 'Please upload an image' });
    return;
  }
  try {
    const imageBuffer = req.file.buffer;
    const prediction = await predictImage(imageBuffer!);
    res.status(200).send({ prediction });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).send({ error: 'Error processing image' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});