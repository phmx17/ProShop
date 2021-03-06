import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
connectDB()

const app = express()

app.use(express.json())

// example middleware; will run with any request
// app.use((req, res, next) => {
//   console.log(`original url: ${req.originalUrl}`);
//   next()
// })

app.get('/', (req, res) => {
  res.send('api is running')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
// apply custom middleware
app.use (notFound)
app.use (errorHandler)

const PORT = process.env.PORT || 5000

app.listen(5000, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode; listening on port ${PORT}...`.yellow.bold)
})