/// <summary>
/// Controladores para manejar operaciones sobre las páginas.
/// </summary>

import { Request, Response } from "express";
import { ConnectDB } from "../db";

export async function GetAllPages(_req: Request, res: Response)
{
    const db = await ConnectDB();
    const pages = await db.collection("pages").find({}).toArray();
    res.json(pages);
}

export async function GetPageByUrl(req: Request, res: Response)
{
    const url = decodeURIComponent(req.params.encodedUrl);
    const db = await ConnectDB();
    const page = await db.collection("pages").findOne({ url });

    if (!page)
    {
        res.status(404).json({ message: "Página no encontrada" });
        return;
    }

    res.json(page);
}