import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
/**
 * @author Amila Karunathilaka
 */

@Component({
  selector: 'drone-comm-resend-verification',
  templateUrl: "./register.verification.component.html"
})
export class RegisterVerificationComponent implements OnInit{

  @Input()
  confirmModalTitle: string = "Resend Email Verification";
  @Input()
  confirmModalContent: string;

  @Input()
  okBtnText: string = "Ok";

  @Input()
  resendBtnText: string = "Resnd";

  @Output()
  okBtnClick: EventEmitter<any> = new EventEmitter();

  @Output()
  resendBtnClick: EventEmitter<any> = new EventEmitter();

  @ViewChild("confirmModal")
  confirmModal;

  ngOnInit() {
  }

  showModal() {
    this.confirmModal.show({blurring: false});
  }

  hideModal(){
    this.confirmModal.hide(500);
  }

  onOkBtnClick() {
    this.okBtnClick.emit();
  }

  onResendBtnClick() {
    this.resendBtnClick.emit();
  }

}
