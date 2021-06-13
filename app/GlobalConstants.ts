import {User} from "./user";
import {Program} from "./program";
import {Countries} from "./countries";
import {PopupFeilds} from "./popup-feilds";

export class GlobalConstants {
  public static popupHeader = '';
  public static selected: boolean;
  public static USERS: User[] = [];
  public static radioButton = 'user';
  public static userID: any;
  public static select: any;
  public static validationErrorNoUser = false;
  public static validationError = false;
  public static placeHolder: any;
  public static userTable: any;
  public static programTable = false;
  public static overlay = false;

  public static PROGRAM: Program[] = [];
  public static countries: Countries[] = [];
  public static POPUP: PopupFeilds[] = [];
  public static rms: boolean;
  public static greenville: boolean;
  public static allRG: boolean;
  public static RMSStr: string;
  public static UserNA: string;
  public static showSpinner = false;

}
