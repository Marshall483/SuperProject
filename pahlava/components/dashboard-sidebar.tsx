import { useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Divider, Drawer, Theme, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { Article as ArticleIcon }  from '@mui/icons-material';
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { Lock as LockIcon } from "../icons/lock";
import { User as UserIcon } from "../icons/user";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";


interface Props {
  onClose: () => void;
  open: boolean;
}

const items = [
  {
    href: "/dashboard",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Панель Статистики",
  },
  {
    href: "/dashboard/myprojects",
    icon: <ArticleIcon fontSize="small" />,
    title: "Мои проекты",
  },
  {
    href: "/dashboard/me",
    icon: <UserIcon fontSize="small" />,
    title: "Аккаунт",
  },
  {
    href: "/logout",
    icon: <LockIcon fontSize="small" />,
    title: "Выход",
  },
];

export const DashboardSidebar = (props: Props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const theme = useTheme()
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          height: "100%",
        }}
      >
        <Box sx={{ p: 3, pb: 1, display: "flex" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Logo
              sx={{
                height: 42,
                width: 42,
              }}
            />
          </Box>
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              mx: 1,
              py: 1,
              px: 3,
              borderRadius: 1,
            }}
          >
            <Typography color="inherit" variant="h5">
              Pahlava
            </Typography>
          </Box>
        </Box>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 1,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
