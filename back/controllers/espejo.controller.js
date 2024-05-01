import e from "express";
import { pool } from "../database/db.js";

export const getExamenesPacientes= async (req,res)=>{

    const {id} = req.query
    console.log(id)
    let examenes=[]
    try {
        const [examenes2]= await pool.execute(`SELECT * FROM examenes_paciente WHERE id_pac = '${id}'`)
        const [bioanalista]= await pool.execute(`SELECT * FROM bioanalistas WHERE id = '${examenes2[0].id_bio}'`)
        for await (const ex of examenes2){
        const [infoExamen] = await pool.execute(`SELECT * FROM examenes where id =?`, [ex.id_ex])
        const [seccion]= await pool.execute(`SELECT * FROM seccion_examen WHERE id = ?`, [infoExamen[0].id_seccion])

        const [detalles]= await pool.execute(`SELECT * FROM detalles_examenes_paciente where id_ex_pac= ?`,[ex.id])
        let detalles2 =detalles
        let caracteristicas =[]
        for await (const dt of detalles2){

            const [detalleInfo] = await pool.execute(`SELECT * FROM detalles_examen WHERE id = '${dt.id_dt}'`)
            console.log(detalleInfo)
            const [subCar]= await pool.execute(`SELECT * FROM detalle_subcaracteristica_paciente where id_det_ex = '${dt.id}'`)
            let subCaracteristicas=[]
            for await (const sb of subCar) {
            const [subCaInfo]= await pool.execute(`SELECT * FROM subcaracteristicas_detalle WHERE id=${sb.id_detalle_sub}`)
            subCaracteristicas.push({
                idSub:subCaInfo[0].id,
                nombreSub:subCaInfo[0].nombre,
                resultado:sb.resultado,
                idCar:dt.id_dt,
                nota:sb.nota,
                tipo:subCaInfo[0].tipo
            })
            }
            
            
            caracteristicas.push({
            nombre:detalleInfo[0].nombre,
            resultado:dt.resultado,
            nota:dt.nota,
            unidad: detalleInfo[0].unidad,
            inferior:dt.inferior,
            superior:dt.superior,
            imprimir:detalleInfo[0].impsiempre,
            subCaracteristicas
            })
        }
        
        examenes.push({
            id: ex.id,
            examen: infoExamen[0].nombre,
            nombreSeccion: seccion[0].nombre,
            bioanalista:bioanalista[0].nombre,
            caracteristicas,
            fecha:ex.fecha
        })
        }

            res.status(200).json({examenes})
    } catch (error) {
        res.status(500).json({error})
    }

}

export const getPacientesDia = async(req,res)=>{
    try {
        let [fecha1] = await pool.execute(`SELECT CURRENT_DATE`)
        console.log(fecha1[0].CURRENT_DATE)
        let fecha = fecha1[0].CURRENT_DATE
        fecha= fecha.toJSON()
        fecha=fecha.split("T")[0]
        
        let examenDia =[]
        const [exPacientes]= await pool.execute(`SELECT DISTINCT (id_pac) FROM examenes_paciente WHERE fecha between '${fecha} 00:00:01' AND '${fecha} 23:59:59'`)
        let pacientes=[]

        for await (const p of exPacientes){
            const [paciente] = await pool.execute(`SELECT * FROM pacientes where id = '${p.id_pac}'`)
            pacientes.push(paciente[0])
        }

        const [pacientesTabla] = await pool.execute(`select * FROM pacientes`)
        await res.status(200).json({pacientes,pacientesTabla})
    } catch (error) {
        console.log(error)
    }
}

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