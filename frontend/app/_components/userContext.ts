import { createContext } from "react";
import { userFormdata } from "../schemas/userSchema";
export const userContext = createContext<userFormdata | undefined>(undefined);
//using useContext to transfer same data to different components, and componenets render different properties of this.
//above is appliable for saved datas.
//what do I want to do? -> Save the userdata schema(blank | undefined) -> implement logic based on whether the user is registered or not.
//zod -> set of rules applied to form text formats, reacthookform renders the form, info side has to decide which to render.

//flow -> check if the user is registered -> if (registered) {render login page} -> if (not registered) {render signup page}
//saving the info and -> JWD token ()