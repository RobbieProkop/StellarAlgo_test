import express from "express"
import {
  getTotalPricePerEvent,
  getTotalTicketsPerType,
  getHighestTotalName,
  getHighestTicketsName,
  getTotalPurchasePerGame,
  getAll,
  getHighestTotalIndividual,
  getHighestTicketsIndividual
} from "../controllers/parquetController.js"

const router = express.Router();

router.route("/total/price/:date").get(getTotalPricePerEvent)
router.route("/total/tickets").get(getTotalTicketsPerType)
router.route("/total/purchase").get(getTotalPurchasePerGame)
router.route("/highest/total/individual").get(getHighestTotalIndividual)
router.route("/highest/total/name").get(getHighestTotalName)
router.route("/highest/tickets/individual").get(getHighestTicketsIndividual)
router.route("/highest/tickets/name").get(getHighestTicketsName)
router.route("/getAll").get(getAll)

export default router