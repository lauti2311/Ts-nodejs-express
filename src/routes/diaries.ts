import express from 'express'
import * as diaryServices from '../services/diaryServices'
import toNewDiaryEntry from '../utils'
const router = express.Router()

router.get('/', (_req, res) => {
  res.send(diaryServices.getEntriesWithoutSensitiveInfo())
})

router.get('/:id', (req, res) => {
  const diary = diaryServices.findById(Number(req.params.id))
  return (diary != null)
    ? res.send(diary)
    : res.sendStatus(404)
})

router.post('/', (_req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(_req.body)
    const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry)
    res.json(addedDiaryEntry)
  } catch (e: unknown) {
    res.status(400).send((e as Error).message)
  }
})

export default router
