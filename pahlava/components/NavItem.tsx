import NextLink from "next/link";
import { useRouter } from "next/router";
import { Box, Button, ListItem } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  href: string;
  icon: ReactNode;
  title: string;
}

export const NavItem = (props: Props) => {
  const { href, icon, title, ...others } = props;
  const router = useRouter();
  const active = href ? router.pathname === href : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...others}
    >
      <NextLink href={href} passHref>
        <Button
          component="a"
          startIcon={icon}
          disableRipple
          sx={{
            bgcolor: active ? "rgba(255,255,255, 0.08)" : "inherit",
            borderRadius: 1,
            color: active ? "secondary.main" : "neutral.300",
            fontWeight: active ? "fontWeightBold" : "inherit",
            justifyContent: "flex-start",
            px: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            "& .MuiButton-startIcon": {
              color: active ? "secondary.main" : "neutral.400",
            },
            "&:hover": {
              bgcolor: "rgba(255,255,255, 0.08)",
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </Button>
      </NextLink>
    </ListItem>
  );
};
