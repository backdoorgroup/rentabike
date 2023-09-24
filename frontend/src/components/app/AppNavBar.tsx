import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"

import AppBar from "@mui/material/AppBar"
import Icon from "@mui/material/Icon"
import Link from "@mui/material/Link"
import Toolbar from "@mui/material/Toolbar"

import { AuthDialog } from "@/components"
import { AuthService } from "@/services"
import { useUserStore } from "@/stores"

interface Props {
  basic?: boolean
}

export function AppNavBar({ basic }: Props) {
  const { user } = useUserStore()

  const [open, setOpen] = useState(false)

  const handleOpenDialog = () => setOpen(true)
  const handleCloseDialog = () => setOpen(false)

  const handleSignIn = () => {
    handleCloseDialog()
  }
  const handleSignOut = async () => {
    await AuthService.signOut()

    handleCloseDialog()
  }

  return (
    <AppBar
      component="header"
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "lightgray" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link component={RouterLink} to="/" sx={{ fontSize: 24, height: 24, width: 24, color: "text.primary" }}>
          <Icon fontSize="inherit">directions_bike</Icon>
        </Link>

        {!basic && (
          <>
            <Icon sx={{ fontSize: 24, height: 24, width: 24 }} onClick={handleOpenDialog}>
              account_circle
            </Icon>
            <AuthDialog
              user={user}
              open={open}
              handleSignIn={handleSignIn}
              handleSignOut={handleSignOut}
              handleClose={handleCloseDialog}
            />
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
