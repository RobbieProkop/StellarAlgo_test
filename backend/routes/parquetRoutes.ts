import express from "express"
import {
  getTotalPricePerEvent,
  getTotalTicketsPerType,
  getHighestTotalName,
  getHighestTicketsName,
  getTotalPurchasePerGame
} from "../controllers/parquetController.js"

const router = express.Router();

router.route("/total/price").get(getTotalPricePerEvent)
router.route("/total/tickets").get(getTotalTicketsPerType)
router.route("/highestTotalName").get(getHighestTotalName)
router.route("/highestTicketsName").get(getHighestTicketsName)
router.route("/totalPurchase").get(getTotalPricePerEvent)

export default router