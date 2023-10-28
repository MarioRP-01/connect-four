export interface AcceptorController {
  control: () => Promise<void>
}
