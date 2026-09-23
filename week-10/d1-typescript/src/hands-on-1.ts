// ============================================================
// Your first TypeScript file (src/app.ts)
// On your machine you would compile this with:  tsc
// Here, Run Code shows the SAME output the generated .js produces.
// ============================================================

// A typed greeting — note the : string annotations
const courseName: string = "Full Stack Software Engineering";
const weekNumber: number = 2;
const isTypeScriptWeek: boolean = true;

function describeCourse(name: string, week: number): string {
    return `${name} — Week ${week}`;
}

console.log(describeCourse(courseName, weekNumber));
console.log("Is this the TypeScript week?", isTypeScriptWeek);

// TODO: add a constant studentCount of type number and log it
// TODO: call describeCourse again with week + 1 and log the result
const studentCount:number = 17;
console.log(describeCourse("Learn typescrip", 1));
// console.log(describeCourse("Learn typescrip", true));

console.log(typeof studentCount);

function tesNull(name: string, address: null) : string {
    return name;
}

// console.log(tesNull("rizka", 70));
console.log(tesNull("rizka", null));
