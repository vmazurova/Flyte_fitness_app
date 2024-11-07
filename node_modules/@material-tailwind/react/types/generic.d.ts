/// <reference types="react" />
import type { AnimatePresenceProps } from "framer-motion";
import type { UseDismissProps } from "@floating-ui/react";
export type colors = "blue-gray" | "gray" | "brown" | "deep-orange" | "orange" | "amber" | "yellow" | "lime" | "light-green" | "green" | "teal" | "cyan" | "light-blue" | "blue" | "indigo" | "deep-purple" | "purple" | "pink" | "red";
export type animation = {
    initial?: object;
    mount?: object;
    unmount?: object;
};
export interface dismissType extends UseDismissProps {
}
export type offsetType = number | {
    mainAxis?: number;
    crossAxis?: number;
    alignmentAxis?: number | null;
};
export interface NewAnimatePresenceProps extends Omit<AnimatePresenceProps, "children"> {
    children: React.ReactNode;
}
export declare const propTypesColors: string[];
export declare const propTypesAnimation: any;
export declare const propTypesDismissType: any;
export declare const propTypesOffsetType: any;
export declare const propTypesPlacements: string[];
//# sourceMappingURL=generic.d.ts.map