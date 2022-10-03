import React from "react";
import { CacheProvider } from "@emotion/react";
import createCache, { Options as CreateCacheOptions } from "@emotion/cache";
import { StylesProvider, StylesProviderProps } from "..";
import { getRandomString } from "../utils";
import { StyledEngineProvider } from "@mui/styled-engine";
import { ThemeProvider as MuiThemeProvider, Theme } from "@mui/material/styles";
import merge from "lodash.merge";
import { theme as defaultTheme } from "../theme";

export interface ThemeProviderProps {
  styleProviderProps?: StylesProviderProps;
  emotionCacheOptions?: CreateCacheOptions;
  theme?: Partial<Theme>;
  children?: React.ReactNode;
}

const ThemeProvider = ({
  styleProviderProps,
  emotionCacheOptions,
  theme,
  children,
}: ThemeProviderProps) => {
  const themeWithOverrides = merge(defaultTheme, theme) as Theme;
  return (
    <CacheProvider
      value={createCache({
        key: getRandomString(),
        ...emotionCacheOptions,
      })}
    >
      <StylesProvider {...styleProviderProps}>
        <StyledEngineProvider injectFirst>
          <MuiThemeProvider theme={themeWithOverrides}>
            {children}
          </MuiThemeProvider>
        </StyledEngineProvider>
      </StylesProvider>
    </CacheProvider>
  );
};

export default ThemeProvider;
