import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
      <Tabs
            screenOptions={{
                    headerShown: false,
                            tabBarActiveTintColor: "#22c55e",
                                    tabBarStyle: {
                                              backgroundColor: "#0f172a",
                                                        borderTopWidth: 0,
                                                                },
                                                                      }}
                                                                          >
                                                                                <Tabs.Screen
                                                                                        name="index"
                                                                                                options={{
                                                                                                          title: "Home",
                                                                                                                    tabBarIcon: ({ color, size }) => (
                                                                                                                                <Ionicons name="home" size={size} color={color} />
                                                                                                                                          ),
                                                                                                                                                  }}
                                                                                                                                                        />

                                                                                                                                                              <Tabs.Screen
                                                                                                                                                                      name="explore"
                                                                                                                                                                              options={{
                                                                                                                                                                                        title: "Explore",
                                                                                                                                                                                                  tabBarIcon: ({ color, size }) => (
                                                                                                                                                                                                              <Ionicons name="search" size={size} color={color} />
                                                                                                                                                                                                                        ),
                                                                                                                                                                                                                                }}
                                                                                                                                                                                                                                      />

                                                                                                                                                                                                                                            <Tabs.Screen
                                                                                                                                                                                                                                                    name="apply"
                                                                                                                                                                                                                                                            options={{
                                                                                                                                                                                                                                                                      title: "Apply",
                                                                                                                                                                                                                                                                                tabBarIcon: ({ color, size }) => (
                                                                                                                                                                                                                                                                                            <Ionicons name="document-text" size={size} color={color} />
                                                                                                                                                                                                                                                                                                      ),
                                                                                                                                                                                                                                                                                                              }}
                                                                                                                                                                                                                                                                                                                    />
                                                                                                                                                                                                                                                                                                                        </Tabs>
                                                                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                                                                          }