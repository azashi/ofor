import { Realm, PropertyTypeName } from "realm";

export class Todo extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  isComplete!: boolean;
  syncedAt!: Date | null;
  createdAt!: Date;
  type!: string;

  static schema = {
    name: "Todo",
    primaryKey: "_id",
    properties: {
      _id: {
        type: "objectId" as PropertyTypeName,
        default: () => new Realm.BSON.ObjectId(),
      },
      title: "string",
      isComplete: { type: "bool" as PropertyTypeName, default: false },
      createdAt: {
        type: "date" as PropertyTypeName,
        default: () => new Date(),
      },
      syncedAt: "date?",
      type: "string",
    },
  };
}
