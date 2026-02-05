import type { RequestHandler } from "express";
import { StaffModel } from "../../database/schema/staff.schema.js";
import bcrypt from "bcrypt";
export const addNewStaff: RequestHandler = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const body = req.body;

    const staffExists = await StaffModel.findOne({
      $or: [
        { email: body.email },
        { firstname: body.firstname },
        { lastname: body.lastname },
      ],
    });
    if (staffExists) {
      return res.status(409).json({ message: "existing registree" });
    }

    const staffIdGenerate = () => {
      const firstname = body.firstname as string;
      const lastName = body.lastname as string;
      const lastInitial = lastName[0];
      const timestamp = Date.now().toString().slice(-2);
      const random = Math.floor(10 + Math.random() * 90);
      const last4Digits = timestamp + random;
      const ID = `${firstname}_${lastInitial}#${last4Digits}`;
      return ID;
    };
    const generatedID = staffIdGenerate();

    const newStaff = await StaffModel.create({
      StaffID: generatedID,
      firstname: body.firstname,
      lastname: body.lastname,
      password: hashedPassword,
      email: body.email,
      SSN: body.SSN,
    });
    const {password: _, ...rest} = newStaff.toObject();
    res.status(201).json({
      staff: rest,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//staff flow goes like this:
//let's say that fresh hiree is trying to register in the system.
//a 6 digit otp code is generated from the server for him.
//he enters the code and gets access to create an account within 1 hour. -> session
//after he accesses to the system, let the system request log in, which then the staff logs in to get accesstoken.
//the accesstoken expiration is -> if the user is no longer within the system for 10 minutes.

//staff enters his authorization document // which could be very parctical for countrires like us, canada.
//but I skip this part cuz I got no access to the system.

//aside from that, staff enters his email, as well as personal information in the system,
//but the unique staffId is generated from the system for the staff.
//server responds the generated staffID
//the staffID must be used in order to access to the system.
