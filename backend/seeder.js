import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

/**
 * Beware before running this as it will delete all current data
 */

const importData = async () => {
  try {
    await Order.deleteMany()  // clear out DB
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id //get the admin 
    const sampleProducts = products.map(product => {  
      return { ...product, user: adminUser }  // pack adminUser into each product
    })
    await Product.insertMany(sampleProducts)

    console.log('data imported'.green.inverse);     

  } catch (err) {
    console.error(`${err}`.red.inverse)
    process.exit(1) // die
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()  // clear out DB
    await Product.deleteMany()
    await User.deleteMany()

    console.log('data destroyed'.red.inverse);     

  } catch (err) {
    console.error(`${err}`.red.inverse)
    process.exit(1) // die
  }
}

// accessing parameter '-d' passed on execution for delete
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
// go create a script in package.json
// "data:import": "node backend/seeder",
// "data:destroy": "node backend/seeder -d"


