import {UnitType} from "../enums/unit-type";

export class UnitPackage {
  public list : Array<UnitType> = [UnitType.mg,  UnitType.g, UnitType.dag, UnitType.kg, UnitType.ml, UnitType.piece]
  public convert(inx: UnitType) : string {
    switch (inx) {
      case UnitType.mg:
        return "mg";
      case UnitType.g:
        return "g";
      case UnitType.dag:
        return "dag";
      case UnitType.kg:
        return "kg";
      case UnitType.ml:
        return "ml";
      case UnitType.piece:
        return "no.";
      default:
        return "Unknown";
    }
  }
}
