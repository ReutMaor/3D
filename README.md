1. Navigate to the Directory Where You Want to Clone: Use the cd command to navigate to the directory where you want to store the repository: cd /path/to/your/directory

2. Clone the Repository: Use the git clone command followed by the repository URL: git clone https://github.com/ReutMaor/WeatherApp.git

3. Now you will see a folder that created in the path that you wanted . Open your OS code editor --> Open Folder---> Open the folder that you saw that created .

4. Open Terminal and run this comannd: npm install
5. Go to https://aws.amazon.com/polly/
6. Click "Create an AWS account " and register.
    secretAccessKey: process.env.AWS_SECRET_KEY
7. You will get an accessKeyId and secretAccessKey.
8.  Go to aws-config.js in the project and enter the accessKeyId and secretAccessKey here :

    const awsConfig = {
    accessKeyId: "YOUR_AWS_ACCESS_KEY", // AWS Access Key ID
    secretAccessKey: "YOUR_AWS_SECRET_KEY" // AWS Secret Access Key

};
9. Save .
10. Run this command: npm start.
  
Now the website will open on your browswer .
