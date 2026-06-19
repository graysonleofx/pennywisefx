const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json'); // download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://investment-300c6-default-rtdb.firebaseio.com'
});

async function createAdmin(email, password) {
  try {
    const userRecord = await admin.auth().createUser({ email, password });
    const uid = userRecord.uid;
    // set role in Realtime Database
    await admin.database().ref(`users/${uid}`).set({ role: 'admin', email });
    console.log('Admin created:', uid);
  } catch (err) {
    console.error('Error creating admin:', err);
  }
}

// Replace with the admin email/password you want to create
createAdmin('admin@pennywise.com', '1937519375@123');