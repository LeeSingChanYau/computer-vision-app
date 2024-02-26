const AWS = require('aws-sdk');

// Set up AWS credentials and configuration
AWS.config.update({ region: 'us-east-2' }); // Specify the appropriate region
const rekognition = new AWS.Rekognition();

function detectShoes(imageFile) {
  return new Promise((resolve, reject) => {
    // Specify the parameters for the detectCustomLabels operation
    const params = {
      ProjectVersionArn:
        'arn:aws:rekognition:us-east-2:197473575038:project/jordan_model/version/jordan_model.2024-02-16T16.50.37/1708131037968',
      Image: {
        Bytes: imageFile,
      },
    };

    // Call the detectCustomLabels operation to perform inference
    rekognition.detectCustomLabels(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.CustomLabels);
      }
    });
  });
}

module.exports = { detectShoes };
