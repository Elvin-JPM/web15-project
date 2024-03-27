import * as React from "react";

const Card = 
(({  ...props }) => (
  <div
    className=
      "rounded-lg bg-card text-card-foreground shadow-sm"
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = (({  ...props }) => (
  <div
    className="flex flex-col space-y-1.5 p-4"
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = (({  ...props }) => (
  <div
    className="min-h-min text-lg font-semibold leading-none tracking-tight"
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardTitleDescription = (({  ...props }) => (
  <p
    className="text-sm text-muted-foreground"
    {...props}
  />
));
CardTitleDescription.displayName = "CardTitleDescription";

const CardContent = (({ ...props }) => (
  <div className="p-4 pt-0" {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = (({  ...props }) => (
  <div
    className="flex items-center p-4 pt-0"
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardTitleDescription,
};
