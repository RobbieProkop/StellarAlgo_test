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
router.route("/highestTotalName").get(getHighestTotalName)
router.route("/highestTicketsName").get(getHighestTicketsName)
router.route("/totalPurchase").get(getTotalPurchasePerGame)
router.route("/getAll").get(getAll)

export default router