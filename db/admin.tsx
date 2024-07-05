import { toDateTime } from "@/utils/helpers"
import { stripe } from "@/utils/stripe/config"
import { createClient } from "@supabase/supabase-js"
import Stripe from "stripe"
import type { Database, Tables, TablesInsert } from "@/supabase/types"
import { v4 as uuidv4 } from "uuid"

type Product = Tables<"products">
type Price = Tables<"prices">

// Change to control trial period length
const TRIAL_PERIOD_DAYS = 0

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin privileges and overwrites RLS policies!
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
)

export const saveRecipe = async (recipe: TablesInsert<"recipes">) => {
  // Check if the recipe already exists by looking for a unique identifier (e.g., id)
  const { data: existingRecipe, error: fetchError } = await supabaseAdmin
    .from("recipes")
    .select("*")
    .eq("id", recipe.id)
    .single()

  if (fetchError && fetchError.code !== "PGRST116") {
    throw fetchError
  }

  if (existingRecipe) {
    // If the recipe exists, update it
    const { data: updatedRecipe, error: updateError } = await supabaseAdmin
      .from("recipes")
      .update(recipe)
      .eq("id", recipe.id)

    if (updateError) {
      throw updateError
    }
    return updatedRecipe
  } else {
    // If the recipe does not exist, insert it
    const { data: newRecipe, error: insertError } = await supabaseAdmin
      .from("recipes")
      .insert(recipe)

    if (insertError) {
      throw insertError
    }
    return newRecipe
  }
}

export const deleteRecipe = async (recipe: TablesInsert<"recipes">) => {
  // Check if the recipe already exists by looking for a unique identifier (e.g., id)
  const { data: deletedRecipe, error: fetchError } = await supabaseAdmin
    .from("recipes")
    .delete()
    .eq("id", recipe.id)

  if (fetchError && fetchError.code !== "PGRST116") {
    throw fetchError
  }

  return deletedRecipe
}
export const deleteSeoPage = async (id: string) => {
  // Check if the recipe already exists by looking for a unique identifier (e.g., id)
  const { data: deletedPage, error: fetchError } = await supabaseAdmin
    .from("search_result_metadata")
    .delete()
    .eq("id", id)

  if (fetchError && fetchError.code !== "PGRST116") {
    throw fetchError
  }

  return deletedPage
}
export const saveSeoPage = async (
  page: TablesInsert<"search_result_metadata">
) => {
  // Check if the recipe already exists by looking for a unique identifier (e.g., id)
  const { data: existingPage, error: fetchError } = await supabaseAdmin
    .from("search_result_metadata")
    .select("*")
    .eq("id", page.id)
    .single()

  if (fetchError && fetchError.code !== "PGRST116") {
    throw fetchError
  }

  if (existingPage) {
    // If the recipe exists, update it
    const { data: updatedPage, error: updateError } = await supabaseAdmin
      .from("search_result_metadata")
      .update(page)
      .eq("id", page.id)

    if (updateError) {
      throw updateError
    }
    return updatedPage
  } else {
    // If the recipe does not exist, insert it
    const { data: newPage, error: insertError } = await supabaseAdmin
      .from("search_result_metadata")
      .insert(page)

    if (insertError) {
      throw insertError
    }
    return newPage
  }
}
export const getSeoPages = async () => {
  const { data: pages, error } = await supabaseAdmin
    .from("search_result_metadata")
    .select("*")

  if (error) {
    throw error
  }
  
  return pages
}
export const getGuestForYou = async () => {
  // get 10 random entries from table recipes
  const { data: recipes, error } = await supabaseAdmin
    .from("recipes")
    .select("*")
    //.order("RANDOM()")
    .limit(10)
  if (error) {
    throw error
  }

  return recipes
}

export const getForYou = async (uid: string) => {
  const { data: settings, error: settingsError } = await supabaseAdmin
    .from("settings")
    .select("allergies,diet")
    .eq("id", uid)

  if (settingsError) {
    throw settingsError
  }

  const res = []
  // get 10 random entries from table recipes
  const { data: recipes, error: recipesError } = await supabaseAdmin
    .from("recipes")
    .select("*")
    .limit(8)
  if (recipesError) {
    throw recipesError
  }

  const randomRecipes = recipes.sort(() => Math.random() - 0.5)

  return randomRecipes
}
export const getAllRecipes = async () => {
  const { data: recipes, error } = await supabaseAdmin
    .from("recipes")
    .select("*")

  if (error) {
    throw new Error(error.message)
  }
  return recipes
}
export const save_query = async (uid: string | null, query: string) => {
  const { data: queryData, error } = await supabaseAdmin
    .from("queries")
    .insert({
      id: uuidv4(),
      query,
      uid
    })

  if (error) {
    throw new Error(error.message)
  }
  return queryData
}

export const getRecipeById = async (id: string) => {
  const { data: recipeData, error } = await supabaseAdmin
    .from("recipes")
    .select("*")
    .eq("id", id)
    .single()
  if (error) {
    throw new Error(error.message)
  }

  return recipeData
}

const upsertProductRecord = async (product: Stripe.Product) => {
  const productData: Product = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description ?? null,
    image: product.images?.[0] ?? null,
    metadata: product.metadata
  }

  const { error: upsertError } = await supabaseAdmin
    .from("products")
    .upsert([productData])
  if (upsertError)
    throw new Error(`Product insert/update failed: ${upsertError.message}`)
  console.log(`Product inserted/updated: ${product.id}`)
}

const upsertPriceRecord = async (
  price: Stripe.Price,
  retryCount = 0,
  maxRetries = 3
) => {
  const priceData: Price = {
    id: price.id,
    product_id: typeof price.product === "string" ? price.product : "",
    active: price.active,
    currency: price.currency,
    type: price.type,
    unit_amount: price.unit_amount ?? null,
    interval: price.recurring?.interval ?? null,
    interval_count: price.recurring?.interval_count ?? null,
    trial_period_days: price.recurring?.trial_period_days ?? TRIAL_PERIOD_DAYS
  }

  const { error: upsertError } = await supabaseAdmin
    .from("prices")
    .upsert([priceData])

  if (upsertError?.message.includes("foreign key constraint")) {
    if (retryCount < maxRetries) {
      console.log(`Retry attempt ${retryCount + 1} for price ID: ${price.id}`)
      await new Promise(resolve => setTimeout(resolve, 2000))
      await upsertPriceRecord(price, retryCount + 1, maxRetries)
    } else {
      throw new Error(
        `Price insert/update failed after ${maxRetries} retries: ${upsertError.message}`
      )
    }
  } else if (upsertError) {
    throw new Error(`Price insert/update failed: ${upsertError.message}`)
  } else {
    console.log(`Price inserted/updated: ${price.id}`)
  }
}

const deleteProductRecord = async (product: Stripe.Product) => {
  const { error: deletionError } = await supabaseAdmin
    .from("products")
    .delete()
    .eq("id", product.id)
  if (deletionError)
    throw new Error(`Product deletion failed: ${deletionError.message}`)
  console.log(`Product deleted: ${product.id}`)
}

const deletePriceRecord = async (price: Stripe.Price) => {
  const { error: deletionError } = await supabaseAdmin
    .from("prices")
    .delete()
    .eq("id", price.id)
  if (deletionError)
    throw new Error(`Price deletion failed: ${deletionError.message}`)
  console.log(`Price deleted: ${price.id}`)
}

const upsertCustomerToSupabase = async (uuid: string, customerId: string) => {
  const { error: upsertError } = await supabaseAdmin
    .from("customers")
    .upsert([{ id: uuid, stripe_customer_id: customerId }])

  if (upsertError)
    throw new Error(
      `Supabase customer record creation failed: ${upsertError.message}`
    )

  return customerId
}

const createCustomerInStripe = async (uuid: string, email: string) => {
  const customerData = { metadata: { supabaseUUID: uuid }, email: email }
  const newCustomer = await stripe.customers.create(customerData)
  if (!newCustomer) throw new Error("Stripe customer creation failed.")

  return newCustomer.id
}

const createOrRetrieveCustomer = async ({
  email,
  uuid
}: {
  email: string
  uuid: string
}) => {
  // Check if the customer already exists in Supabase
  const { data: existingSupabaseCustomer, error: queryError } =
    await supabaseAdmin
      .from("customers")
      .select("*")
      .eq("id", uuid)
      .maybeSingle()

  if (queryError) {
    throw new Error(`Supabase customer lookup failed: ${queryError.message}`)
  }

  // Retrieve the Stripe customer ID using the Supabase customer ID, with email fallback
  let stripeCustomerId: string | undefined
  if (existingSupabaseCustomer?.stripe_customer_id) {
    const existingStripeCustomer = await stripe.customers.retrieve(
      existingSupabaseCustomer.stripe_customer_id
    )
    stripeCustomerId = existingStripeCustomer.id
  } else {
    // If Stripe ID is missing from Supabase, try to retrieve Stripe customer ID by email
    const stripeCustomers = await stripe.customers.list({ email: email })
    stripeCustomerId =
      stripeCustomers.data.length > 0 ? stripeCustomers.data[0].id : undefined
  }

  // If still no stripeCustomerId, create a new customer in Stripe
  const stripeIdToInsert = stripeCustomerId
    ? stripeCustomerId
    : await createCustomerInStripe(uuid, email)
  if (!stripeIdToInsert) throw new Error("Stripe customer creation failed.")

  if (existingSupabaseCustomer && stripeCustomerId) {
    // If Supabase has a record but doesn't match Stripe, update Supabase record
    if (existingSupabaseCustomer.stripe_customer_id !== stripeCustomerId) {
      const { error: updateError } = await supabaseAdmin
        .from("customers")
        .update({ stripe_customer_id: stripeCustomerId })
        .eq("id", uuid)

      if (updateError)
        throw new Error(
          `Supabase customer record update failed: ${updateError.message}`
        )
      console.warn(
        `Supabase customer record mismatched Stripe ID. Supabase record updated.`
      )
    }
    // If Supabase has a record and matches Stripe, return Stripe customer ID
    return stripeCustomerId
  } else {
    console.warn(
      `Supabase customer record was missing. A new record was created.`
    )

    // If Supabase has no record, create a new record and return Stripe customer ID
    const upsertedStripeCustomer = await upsertCustomerToSupabase(
      uuid,
      stripeIdToInsert
    )
    if (!upsertedStripeCustomer)
      throw new Error("Supabase customer record creation failed.")

    return upsertedStripeCustomer
  }
}

/**
 * Copies the billing details from the payment method to the customer object.
 */
const copyBillingDetailsToCustomer = async (
  uuid: string,
  payment_method: Stripe.PaymentMethod
) => {
  //Todo: check this assertion
  const customer = payment_method.customer as string
  const { name, phone, address } = payment_method.billing_details
  if (!name || !phone || !address) return
  //@ts-ignore
  await stripe.customers.update(customer, { name, phone, address })
  const { error: updateError } = await supabaseAdmin
    .from("profiles")
    .update({
      billing_address: { ...address },
      payment_method: { ...payment_method[payment_method.type] }
    })
    .eq("id", uuid)
  if (updateError)
    throw new Error(`Customer update failed: ${updateError.message}`)
}

const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false
) => {
  // Get customer's UUID from mapping table.
  const { data: customerData, error: noCustomerError } = await supabaseAdmin
    .from("customers")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single()

  if (noCustomerError)
    throw new Error(`Customer lookup failed: ${noCustomerError.message}`)

  const { id: uuid } = customerData!

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method"]
  })
  // Upsert the latest status of the subscription object.
  const subscriptionData: TablesInsert<"subscriptions"> = {
    id: subscription.id,
    user_id: uuid,
    metadata: subscription.metadata,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
    //TODO check quantity on subscription
    // @ts-ignore
    quantity: subscription.quantity,
    cancel_at_period_end: subscription.cancel_at_period_end,
    cancel_at: subscription.cancel_at
      ? toDateTime(subscription.cancel_at).toISOString()
      : null,
    canceled_at: subscription.canceled_at
      ? toDateTime(subscription.canceled_at).toISOString()
      : null,
    current_period_start: toDateTime(
      subscription.current_period_start
    ).toISOString(),
    current_period_end: toDateTime(
      subscription.current_period_end
    ).toISOString(),
    created: toDateTime(subscription.created).toISOString(),
    ended_at: subscription.ended_at
      ? toDateTime(subscription.ended_at).toISOString()
      : null,
    trial_start: subscription.trial_start
      ? toDateTime(subscription.trial_start).toISOString()
      : null,
    trial_end: subscription.trial_end
      ? toDateTime(subscription.trial_end).toISOString()
      : null
  }

  const { error: upsertError } = await supabaseAdmin
    .from("subscriptions")
    .upsert([subscriptionData])
  if (upsertError)
    throw new Error(`Subscription insert/update failed: ${upsertError.message}`)
  console.log(
    `Inserted/updated subscription [${subscription.id}] for user [${uuid}]`
  )

  // For a new subscription copy the billing details to the customer object.
  // NOTE: This is a costly operation and should happen at the very end.
  if (createAction && subscription.default_payment_method && uuid)
    //@ts-ignore
    await copyBillingDetailsToCustomer(
      uuid,
      subscription.default_payment_method as Stripe.PaymentMethod
    )
}

export {
  upsertProductRecord,
  upsertPriceRecord,
  deleteProductRecord,
  deletePriceRecord,
  createOrRetrieveCustomer,
  manageSubscriptionStatusChange
}
