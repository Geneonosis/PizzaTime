/**
 * @interface Order
 * @description the order object
 * @property {Crust} Crust - the crust type
 * @property {Flavor} Flavor - the flavor type
 * @property {number} Order_ID - the order id (optional)
 * @property {Size} Size - the size type
 * @property {number} Table_No - the table number
 * @property {string} Timestamp - the timestamp (optional)
 */
export interface Order {
  Crust: string;
  Flavor: string;
  Order_ID?: number;
  Size: string;
  Table_No: number;
  Timestamp?: string;
}
