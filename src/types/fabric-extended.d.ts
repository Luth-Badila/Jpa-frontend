import "fabric";

declare module "fabric" {
  namespace fabric {
    interface Canvas {
      contextContainer?: CanvasRenderingContext2D | null;
    }
  }
}
