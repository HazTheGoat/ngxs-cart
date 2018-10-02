import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { NgxsModule } from "@ngxs/store";
import { states } from "./app.state";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, NgxsModule.forRoot(states)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
