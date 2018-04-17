import { Grid, Ruler } from "./grid";
import { Point } from "./Point";

const sleep = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};

export class Conway implements Ruler {
    previousPoints: Set<Point> = new Set();
    points: Set<Point> = new Set();
    public grid: Grid;

    set(set: Set<Point>) {
        this.points = set;
        this.render();
    }

    render() {
        this.grid.remove(this.previousPoints);
        this.grid.add(this.points);

    }

    start() {
        if (!this.grid.isRunning) {
            return;
        }
        this.iterateOnce().then(() => {
            this.start();
        });
    }

    iterateOnce() {
        return sleep(this.grid.time).then(() => {
            if (!this.grid.isRunning) {
                return;
            }
            const newPoints = this.compute();
            this.set(newPoints);
            this.previousPoints = this.points;
            this.points = newPoints;
            if (this.points.size === 0) {
                this.grid.gridEditor.toggle();
            }
        });
    }

    compute(): Set<Point> {
        let result = new Set();
        // this.grid.getCellList().forEach(p => {
        this.getPointsToLookFor().forEach(p => {
            const around = this.getAround(p);

            const n = around.reduce((acc, ap) => {
                let result = acc;
                if (this.isAlive(ap)) {
                    result++;
                }
                return result;
            }, 0);
            if (n > 3 || n < 2) {
                // the cell is not alive.
            } else if (n === 3) {
                // the cell is alive
                result.add(p);
            } else if (n === 2) {
                if (this.isAlive(p)) {
                    // the cell STAYS alive.
                    result.add(p);
                }
            }
        });
        return result;
    }

    getAround(p: Point): Point[] {
        return [new Point(p.x - 1, p.y - 1), new Point(p.x - 1, p.y), new Point(p.x - 1, p.y + 1),
        new Point(p.x, p.y - 1), new Point(p.x, p.y + 1),
        new Point(p.x + 1, p.y - 1), new Point(p.x + 1, p.y), new Point(p.x + 1, p.y + 1)];
    }

    getPointsToLookFor(): Set<Point> {
        const result = new Set();
        this.points.forEach(p => {
            result.add(p);
            this.getAround(p).forEach(ap => result.add(ap));
        });
        return result;
    }

    isAlive(ap: Point) {
        return this.points.has(ap);
    }

    save() {
        const pointSet = new Set();
        this.grid.cells.forEach((row, i) => row.forEach((cell, j) => {
            if (cell.classList.contains('active')) {
                const p = new Point(i, j);
                pointSet.add(p);
            }
        }));
        this.set(pointSet);
    }

}
