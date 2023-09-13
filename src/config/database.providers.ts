import "reflect-metadata"
import { DataSource } from "typeorm"
import { Category, Post } from "../entity/Post" 
import { Order, OrderItems } from "../entity/Orders" 
import { Performa, PerformaItems } from "../entity/Performa" 
import { Shipment, ShipmentItems } from "../entity/shipmentModel"  
import { Clearnce, } from "../entity/clearnceModel"  
import { Users } from "../entity/Users"
import { lc_tr } from "../entity/lcttModel"



const myDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
<<<<<<< HEAD
  username: "root",
  password: "1234",
  database: "wheels1",
  synchronize: true,
=======
  username: "admin",
  password: "password",
  database: "WHEELS1",
  synchronize: false,
>>>>>>> 24f0515a45c71e3d978702cf962f9cb3d678f48c
  logging: true,
  entities: [Post, Category,Order,OrderItems, Users,Performa, PerformaItems,Shipment, ShipmentItems,Clearnce,lc_tr],
  subscribers: [],
  migrations: [],
})





 const myDataSource1 = new DataSource({
  type: "sqlite",
  database: "./database.sqlite",
  synchronize: false,
  logging: true,
  entities: [Post, Category,Order,OrderItems, Users],
  subscribers: [],
  migrations: [],
})

 



export { myDataSource, myDataSource1 }