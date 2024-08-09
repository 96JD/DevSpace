import { ToastrService } from "ngx-toastr";

export const toastError = (ts: ToastrService, errorMsg: string) => ts.error(errorMsg, "Whoops!");

export const toastSuccess = (ts: ToastrService, successMsg: string) => ts.success(successMsg);
