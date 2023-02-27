import mongoose from 'mongoose';
import { getModelForClass, prop } from "@typegoose/typegoose";

class Method {
  @prop({required: true, minlength: 1, maxlength: 255})
  name!: string;
  @prop({required: true, default: "" })
  value!: string;
}

export default getModelForClass(Method);