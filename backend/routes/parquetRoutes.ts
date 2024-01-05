import express from "express"
import {
  getTotalPricePerEvent,
  getTotalTicketsPerType,
  getHighestTotalName,
  getHighestTicketsName,
  getTotalPurchasePerGame,
  getAll
} from "../controllers/parquetController.js"

const router = express.Router();

router.route("/total/price/:date").get(getTotalPricePerEvent)
router.route("/total/tickets").get(getTotalTicketsPerType)
router.route("/total/purchase").get(getTotalPurchasePerGame)
router.route("/highest/totalName").get(getHighestTotalName)
router.route("/highest/ticketsName").get(getHighestTicketsName)
router.route("/getAll").get(getAll)

export default router