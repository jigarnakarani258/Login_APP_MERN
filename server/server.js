import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connnection.js";
import router from "./routers/route.js";

const app = express();

/** Middlewares **/
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'))
app.disable('x-powerd-by')   ///less hackers know about our stack


app.get('/', (req, res) => {
    res.send({
        status: "success",
        message: "Home page"
    })
})

//Add Url in router
app.use( '/api' , router)

/*************Start server only when database connect sucessfully *****************/
connect()
    .then(() => {

        try {
            app.listen(process.env.Port, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log(`Server is listening on http://localhost:${process.env.Port} `)
            })
        }
        catch (error) {
            console.log("can not connnect to the server!!");
        }

    })
    .catch(error => {
        console.log(error);
    })

