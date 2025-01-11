
import { loadStripe } from "@stripe/stripe-js";
const pk = "pk_test_51Pr1vUJzaBXAGNr3nLU3tvY3PUClfrzB5LabPptLlxWqYzYXqsnPmGK52omTvCz4uwSrGhlQx6rU38xdl0JtNdN100imiwpk7H";

export const stripePromise = loadStripe(pk);
