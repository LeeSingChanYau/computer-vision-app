import express, { Request, Response } from 'express';
import * as tf from '@tensorflow/tfjs-node';
import sharp from 'sharp';

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

async function loadImage(imagePath: string) {
   const imageBuffer = await sharp(imagePath)
     .resize(180, 180) 
     .toFormat('png')
     .toBuffer();
   const imageTensor = tf.node
     .decodeImage(imageBuffer, 3)
     .reshape([1, 180, 180, 3]);
   return imageTensor;
}

async function predictImage(imagePath: string) {
  const model = await loadModel();
  const imageTensor = await loadImage(imagePath);
  const prediction = model.predict(imageTensor) as tf.Tensor;
  const predictionData = await prediction.data();
  return predictionData;
}


app.get('/', async (req: Request, res: Response) => {
  const prediction = await predictImage('./images/jordan_4_eval.png');
  res.status(200).send({ prediction });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});