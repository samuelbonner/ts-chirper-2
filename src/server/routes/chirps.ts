import * as express from "express";
import { GetChirp, GetChirps, UpdateChirp, DeleteChirp, CreateChirp } from "../utils/chirpstore";

const router = express.Router();

router.get('/:id?', (req, res) => { // /api/chirps/3
  const id: string = req.params.id;

  if (id) {
    res.json(GetChirp(id));
  } else {
    const chirps = GetChirps();
    let chirpArr: chirp[] = []

    Object.keys(chirps).map(key => chirpArr.push(
      {
        id: key,
        name: chirps[key].name,
        message: chirps[key].message
      }
    ));

    chirpArr.pop(); // eliminate nextid property 

    res.json(chirpArr);
  }
});

router.post('/', (req, res) => {
  const chirpObj: chirp = req.body;

  CreateChirp(chirpObj);

  res.send("success");
});

//mandatory id param to tell the server which chirp to update
router.put('/:id', (req, res) => {
  const id: string = req.params.id;
  const chirpObj: chirp = req.body;

  UpdateChirp(id, chirpObj);

  res.send("edited successfully");
});

router.delete('/:id', (req, res) => {
  const id: string = req.params.id;

  DeleteChirp(id);

  res.send("deleted successfully");
});

interface chirp {
  id?: string,
  name: string,
  message: string
}

export default router