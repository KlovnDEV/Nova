enum PedDecorationZone {
  TORSO = 0,
	HEAD = 1,
	LEFT_ARM = 2,
	RIGHT_ARM = 3,
	LEFT_LEG = 4,
	RIGHT_LEG = 5,
	UNKNOWN = 6,
	NONE = 7
}

export class PedDecoration {
  private handle: number;

  constructor(handle: number) {
    this.handle = handle;
  }

  clearAll(leaveScars = false) {
    if (leaveScars) {
      ClearPedDecorationsLeaveScars(this.handle);
    } else {
      ClearPedDecorations(this.handle);
    }
  }

  add(collection: string, overlay: string) {
    AddPedDecorationFromHashes(this.handle, collection, overlay);
  }

  getZone(collection: string, overlay: string): PedDecorationZone {
    return GetPedDecorationZoneFromHashes(collection, overlay);
  }

}