import { MouseEventHandler } from "react";

export type DropupItem = {
    label: string;
    onClick?: MouseEventHandler<HTMLButtonElement>
}