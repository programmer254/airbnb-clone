import { MongoClient } from 'mongodb';

async function updatePasswordField() {
    const uri = 'mongodb+srv://airbnbclone254:airbnbclone254@cluster0.74nzj.mongodb.net/test'; // Replace with your MongoDB Atlas connection string
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
      const database = client.db('test'); // Replace with your database name
      const users = database.collection('User');
  
      // Update all user documents to add the `hashPassword` field if it doesn't exist
      const addResult = await users.updateMany(
        { hashPassword: { $exists: false } },
        { $set: { hashPassword: '' } } // Set a default value or handle as needed
      );
  
      console.log(`${addResult.modifiedCount} document(s) were updated.`);

      const removeResult = await users.updateMany( 
        { hashedPassword: { $exists: true } }, 
        { $unset: { hashedPassword: "" } }); // Remove the field );
        console.log(`${removeResult.modifiedCount} document(s) were updated.`);


    }catch(error){
      console.log("")
    
    } finally {
      await client.close();
    }
  }
  
  updatePasswordField().catch(console.error);
