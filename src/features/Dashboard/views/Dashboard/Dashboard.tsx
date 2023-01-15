import { useEffect } from "react";
import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import { useTranslation } from "react-i18next";
import HelmetDecorator from "components/HelmetDecorator";
import { Grid, CircularProgress } from "@mui/material";

import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";
import { Item } from "./Dashboard.styled";
import { useAppDispatch, useAppSelector } from "common/store/hooks";
import {
  fetchCharactersImagesCount,
  fetchSceneriesImagesCount,
  fetchActsScenesCount,
  selectActScenesCount,
  selectCharactersImagesCount,
  selectSceneriesImagesCount,
  selectActDialogsCount,
  fetchActsDialogsCount,
} from "features/Dashboard/store/dashboardSlice";
import getRandomColors from "./getRandomColors";
import { Box } from "@mui/system";
import ErrorMessageForGraph from "./ErrorMessageForGraph";

// to be able to use Chart.js in react you have to register it like that. Found here: https://stackoverflow.com/a/71461916
ChartJS.register(...registerables);

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    data: charactersImagesCount,
    isFetching: isFetchingCharactersImagesCount,
    error: charactersImagesError,
  } = useAppSelector(selectCharactersImagesCount);

  const {
    data: sceneriesImagesCount,
    isFetching: isFetchingSceneriesImagesCount,
    error: sceneriesImagesError,
  } = useAppSelector(selectSceneriesImagesCount);

  const {
    data: actScenesCount,
    isFetching: isFetchingActScenesCount,
    error: actScenesError,
  } = useAppSelector(selectActScenesCount);

  const {
    data: actDialogsCount,
    isFetching: isFetchingActDialogsCount,
    error: actDialogsError,
  } = useAppSelector(selectActDialogsCount);

  useEffect(() => {
    dispatch(fetchCharactersImagesCount());
    dispatch(fetchSceneriesImagesCount());
    dispatch(fetchActsScenesCount());
    dispatch(fetchActsDialogsCount());
  }, [dispatch]);
  return (
    <>
      <HelmetDecorator
        description={t("loginPage.metaData.descrption")}
        imageAlt={t("loginPage.metaData.imageAlt")}
        imageUrl="https://media.istockphoto.com/photos/books-picture-id949118068?s=612x612"
        lang={i18n.language}
        title={t("dashboardPage.metaData.title")}
      />

      <DashboardLayoutWrapper>
        <Grid
          container
          rowSpacing={{ xs: 1, sm: 2 }}
          columnSpacing={{ xs: 1, sm: 2 }}
        >
          <Grid item xs={12} lg={6}>
            <Item>
              {isFetchingCharactersImagesCount && <CircularProgress />}
              {charactersImagesError && (
                <ErrorMessageForGraph
                  title={t("graphs.charactersImagesCounter")}
                  message={charactersImagesError}
                />
              )}

              {!isFetchingCharactersImagesCount &&
                charactersImagesCount !== null && (
                  <Bar
                    title={t("graphs.imagesAmount")}
                    options={{
                      plugins: {
                        title: {
                          display: true,
                          text: t("graphs.charactersImagesCounter"),
                        },
                        legend: {
                          display: false,
                        },
                      },
                    }}
                    data={{
                      labels: charactersImagesCount.map((item) => item.name),
                      datasets: [
                        {
                          label: t("graphs.imagesAmount"),
                          data: charactersImagesCount.map(
                            (item) => item.imagesCount
                          ),
                          backgroundColor: getRandomColors(
                            charactersImagesCount.length,
                            "bg"
                          ),
                          borderColor: getRandomColors(
                            charactersImagesCount.length,
                            "border"
                          ),
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                )}
            </Item>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Item>
              {isFetchingSceneriesImagesCount && <CircularProgress />}
              {sceneriesImagesError && (
                <ErrorMessageForGraph
                  title={t("graphs.sceneriesImagesCounter")}
                  message={sceneriesImagesError}
                />
              )}
              {!isFetchingSceneriesImagesCount &&
                sceneriesImagesCount !== null && (
                  <Line
                    title={t("graphs.imagesAmount")}
                    options={{
                      plugins: {
                        title: {
                          display: true,
                          text: t("graphs.sceneriesImagesCounter"),
                        },
                        legend: {
                          display: false,
                        },
                      },
                    }}
                    data={{
                      labels: sceneriesImagesCount.map((item) => item.name),
                      datasets: [
                        {
                          label: t("graphs.imagesAmount"),
                          data: sceneriesImagesCount.map(
                            (item) => item.imagesCount
                          ),
                          backgroundColor: getRandomColors(
                            sceneriesImagesCount.length,
                            "bg"
                          ),
                          borderColor: getRandomColors(
                            sceneriesImagesCount.length,
                            "border"
                          ),
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                )}
            </Item>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Item>
              {isFetchingActScenesCount && <CircularProgress />}
              {actScenesError && (
                <ErrorMessageForGraph
                  title={t("graphs.actScenesAmount")}
                  message={actScenesError}
                />
              )}
              {!isFetchingActScenesCount && actScenesCount !== null && (
                <Box maxWidth={"70%"} m="0 auto">
                  <Doughnut
                    title={t("graphs.scenesAmount")}
                    options={{
                      plugins: {
                        title: {
                          display: true,
                          text: t("graphs.actScenesAmount"),
                        },
                        legend: {
                          display: true,
                        },
                      },
                    }}
                    data={{
                      labels: actScenesCount.map((item) => item.name),
                      datasets: [
                        {
                          label: t("graphs.scenesAmount"),
                          data: actScenesCount.map((item) => item.count),
                          backgroundColor: getRandomColors(
                            actScenesCount.length,
                            "bg"
                          ),
                          borderColor: getRandomColors(
                            actScenesCount.length,
                            "border"
                          ),
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                </Box>
              )}
            </Item>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Item>
              {isFetchingActDialogsCount && <CircularProgress />}
              {actDialogsError && (
                <ErrorMessageForGraph
                  title={t("graphs.actDialogsAmount")}
                  message={actDialogsError}
                />
              )}
              {!isFetchingActDialogsCount && actDialogsCount !== null && (
                <Box maxWidth={"70%"} m="0 auto">
                  <Pie
                    title={t("graphs.dialogsAmount")}
                    options={{
                      plugins: {
                        title: {
                          display: true,
                          text: t("graphs.actDialogsAmount"),
                        },
                        legend: {
                          display: true,
                        },
                      },
                    }}
                    data={{
                      labels: actDialogsCount.map((item) => item.name),
                      datasets: [
                        {
                          label: t("graphs.dialogsAmount"),
                          data: actDialogsCount.map((item) => item.count),
                          backgroundColor: getRandomColors(
                            actDialogsCount.length,
                            "bg"
                          ),
                          borderColor: getRandomColors(
                            actDialogsCount.length,
                            "border"
                          ),
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                </Box>
              )}
            </Item>
          </Grid>
        </Grid>
      </DashboardLayoutWrapper>
    </>
  );
};

export default Dashboard;
