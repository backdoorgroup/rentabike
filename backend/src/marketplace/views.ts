import { Router } from "express"

import { paginate } from "@/utils"
import { BadRequestException, NotFoundException } from "@/exceptions"

import { HttpStatus } from "@lib/http"

import { CreateListingSchema, GetListingsSchema, GetListingSchema } from "@/marketplace/schemas"
import { serializeListing } from "@/marketplace/serializers"
import { getListings, getListing, createListing } from "@/marketplace/services"

export const router = Router()

router.get("/listings", async (req, res) => {
  try {
    const params = GetListingsSchema.parse(req.query)

    const query = await getListings()
    const paginated = paginate(query, params.page, params.perPage)
    const listings = paginated.map((listing) => serializeListing(listing))

    res.status(HttpStatus.Ok).json({ listings, count: query.length })
  } catch (error) {
    res.status(HttpStatus.BadRequest).json(BadRequestException)
  }
})

router.get("/listings/:id", async (req, res) => {
  try {
    const params = GetListingSchema.parse(req.params)

    const query = await getListing(params.id)
    const listing = serializeListing(query)

    res.status(HttpStatus.Ok).json(listing)
  } catch (error) {
    if (error?.name === "EntityNotFoundError") return res.status(HttpStatus.NotFound).json(NotFoundException)
    else return res.status(HttpStatus.BadRequest).json(BadRequestException)
  }
})

router.post("/listings", async (req, res) => {
  try {
    const body = CreateListingSchema.parse(req.body)

    const listing = await createListing(body)
    const serialized = serializeListing(listing)

    res.status(HttpStatus.Ok).json(serialized)
  } catch (error) {
    res.status(HttpStatus.BadRequest).json(BadRequestException)
  }
})
