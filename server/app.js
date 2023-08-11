import express from 'express'
import postsRoutes from './routes/posts.routes.js'
import fileUpload from 'express-fileupload'
import cors from 'cors'

const app = express()


// Middlewares
app.use(cors())
app.use(fileUpload({ 
  useTempFiles: true,
  tempFileDir: './upload',
 }))
app.use(express.json())

// Routes
app.use(postsRoutes)

export default app