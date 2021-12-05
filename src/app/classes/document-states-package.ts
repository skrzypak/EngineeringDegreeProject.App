import {DocumentStates} from "../enums/document-states";

export class DocumentStatesPackage {
  public list : Array<DocumentStates> = [DocumentStates.unsettled, DocumentStates.settled]
  public convert(inx: DocumentStates) : string {
    switch (inx) {
      case DocumentStates.unsettled:
        return "Unsettled";
      case DocumentStates.settled:
        return "Settled";
      default:
        return "Unknown";
    }
  }
}
