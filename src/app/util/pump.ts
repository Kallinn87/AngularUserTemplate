import { BehaviorSubject } from 'rxjs';
import { Helper } from '../util/hleper';
import { DataCollector } from './data-collector';
import { Point } from './point';

interface Pump {
  auto: boolean;
  current: number;
  flowChannel: string;
  flowRate: number;
  gain: number;
  mainOn: boolean;
  maxF: number;
  minF: number;
  name: string;
  power: number;
  primerOn: boolean;
  runtime: number;
  setFlowRate: number;
  speed: number;
}

export class PumpClass extends DataCollector {
  data: Pump = {
    auto: false,
    current: 0,
    flowChannel: 'null',
    flowRate: 0,
    gain: -1,
    mainOn: false,
    maxF: 0,
    minF: 0,
    name: 'null',
    power: 0,
    primerOn: false,
    runtime: 0,
    setFlowRate: 0,
    speed: 0,
  };

  defult: Pump = {
    auto: false,
    current: 0,
    flowChannel: 'null',
    flowRate: 0,
    gain: -1,
    mainOn: false,
    maxF: 0,
    minF: 0,
    name: 'null',
    power: 0,
    primerOn: false,
    runtime: 0,
    setFlowRate: 0,
    speed: 0,
  };

  // This is for subclasses, like pump component for speed
  // visulitation and further process.
  private speedSubject = new BehaviorSubject(0);

  // This is for data collection which graph uses to plot
  // visualy
  public setAll(): void { }
  public init(): void { }
  public gatDataPoint(load:boolean): Point {
    return new Point([this.data.speed]);
  }

  constructor() {
    super();

    let that = this;
    this.data = new Proxy(this.data, {
      // Overright set command.
      set: function (target: any, key: any, value: any) {
        switch (key) {
          case 'speed': {
            // Speed is set, lets notify the subject if something
            // has subscribed to it.
            that.speedSubject.next(value);
            break;
          }
        }
        // We set the value as normal
        target[key] = value;
        return true;
      },
    });
  }



  getSpeedSubject() {
    return this.speedSubject;
  }

  reset() {
    // Set defult values with copy
    Helper.copy(this.defult, this.data);
    // Here we add a 0 data point with true to clear.
    // Meaing it clear the graph
    this.subject.next(new Point([0], true));
    this.dataClear();
    this.stopCollection();
  }

  clear() {
    // Set defult values with copy
    this.subject.next(new Point([0], true));
    this.dataClear();
  }
}
