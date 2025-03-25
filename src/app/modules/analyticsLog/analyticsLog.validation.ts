import { z } from "zod";

const createAnalyticsLogValidation = z.object({
    body:z.object({
    product: z.string({
        required_error: "Product is required",
    }),
    variant: z.string({
        required_error: "Variant is required",
    }),
    singleUnitPrice: z.number({
        required_error: "Single unit price is required",
    }),
    unitsSold: z.number({
        required_error: "Units sold is required",
    }),
    deliveryLoss: z.number({
        required_error: "Delivery loss is required",
    }),
    totalSales: z.number({
        required_error: "Total sales is required",
    }),
    totalLoss: z.number({
        required_error: "Total loss is required",
    }),
    totalRevenue: z.number({
        required_error: "Total revenue is required",
    })
    })
})

export const AnalyticsLogValidation = {
    createAnalyticsLogValidation
}