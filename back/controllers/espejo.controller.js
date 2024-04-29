import { pool } from "../database/db.js";

export const getExamenDia= async (req,res)=>{
    try {
        let [fecha1] = await pool.execute(`SELECT CURRENT_DATE`)
        console.log(fecha1[0].CURRENT_DATE)
        let fecha = fecha1[0].CURRENT_DATE
        fecha= fecha.toJSON()
        fecha=fecha.split("T")[0]
        
        let examenDia =[]
        const [examenes]= await pool.execute(`SELECT * FROM examenes_paciente WHERE fecha between '${fecha} 00:00:01' AND '${fecha} 23:59:59'`)
        for await (const ex of examenes) {
            const [examen] = await pool.execute(`SELECT * FROM examenes where id=${ex.id_ex}`)
            const [paciente] = await pool.execute(`SELECT * FROM pacientes WHERE id=${ex.id_pac}`)
            const [bioanalista] = await pool.execute(`SELECT * FROM bioanalistas WHERE id=${ex.id_bio}`)
            console.log(ex)
            let hora = ex.fecha.toJSON().split("T")[1].split(".")[0]
            examenDia.push({
                id:ex.id,
                cedula: paciente[0].cedula,
                paciente: paciente[0].nombre,
                bioanalista: bioanalista[0].nombre,
                examen: examen[0].nombre,
                hora
            })
        }
        res.status(200).json({examenes:examenDia})
    } catch (error) {
        res.status(500).json({error})
    }

}

export const getExamenByFecha= async (req,res)=>{
    try {
        let {fecha} = req.query
        
        
        
        let examenDia =[]
        const [examenes]= await pool.execute(`SELECT * FROM examenes_paciente WHERE fecha between '${fecha} 00:00:01' AND '${fecha} 23:59:59'`)
        for await (const ex of examenes) {
            const [examen] = await pool.execute(`SELECT * FROM examenes where id=${ex.id_ex}`)
            const [paciente] = await pool.execute(`SELECT * FROM pacientes WHERE id=${ex.id_pac}`)
            const [bioanalista] = await pool.execute(`SELECT * FROM bioanalistas WHERE id=${ex.id_bio}`)
            console.log(ex)
            let hora = ex.fecha.toJSON().split("T")[1].split(".")[0]
            examenDia.push({
                id:ex.id,
                cedula: paciente[0].cedula,
                paciente: paciente[0].nombre,
                bioanalista: bioanalista[0].nombre,
                examen: examen[0].nombre,
                hora
            })
        }
        res.status(200).json({examenes:examenDia})
    } catch (error) {
        res.status(500).json({error})
    }

}

export const getExamenDetalle= async (req,res)=>{
    console.log(req.body)

}