<template>
  <v-container align="center" class="about">
    <v-row>
      <v-col>
        <v-card class="pa-4 mb-6" max-width="600">
          <v-card-title class="text-h5" style="color: rgb(0, 189, 0)">About Page</v-card-title>
          <v-divider class="mb-4"></v-divider>
          <v-card-subtitle class="mb-4" style="color: rgb(0, 189, 0)">App Created By:</v-card-subtitle>
        </v-card>

        <v-card class="pa-4 mb-6" max-width="400">
          <v-row>
            <v-col>
              <v-img src="src/assets/thao.jpg" alt="Thao Nguyen" height="130"></v-img>
            </v-col>

            <v-col>
              <v-card-title class="text-h5">Thao Nguyen</v-card-title>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>School: DePauw</v-list-item-subtitle>
                    <v-list-item-subtitle>Major: Computer Science</v-list-item-subtitle>
                    <v-list-item-subtitle>Year: Junior</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="pa-4" max-width="400">
          <v-row>
            <v-col>
              <v-img src="src/assets/tri.jpg" alt="Thao Nguyen" height="130"></v-img>
            </v-col>

            <v-col>
              <v-card-title class="text-h5">Tri Nguyen</v-card-title>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>School: DePauw</v-list-item-subtitle>
                    <v-list-item-subtitle>Major: Computer Science</v-list-item-subtitle>
                    <v-list-item-subtitle>Year: Senior</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.pa-4 {
  padding: 4px !important;
}

.mb-4 {
  margin-bottom: 4px !important;
}
</style>
