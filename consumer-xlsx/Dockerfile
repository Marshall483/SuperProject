#### Stage 1: Build the application
FROM maven:3.8.5-openjdk-8-slim as build
# Set the current working directory inside the image
WORKDIR /app

# Copy maven executable to the image
COPY mvnw .
COPY .mvn .mvn
RUN mvn -N io.takari:maven:wrapper

# Copy the pom.xml file
COPY pom.xml .

# Build all the dependencies in preparation to go offline.
# This is a separate step so the dependencies will be cached unless
# the pom.xml file has changed.
#RUN /opt/maven -N io.takari:maven:wrapper

RUN mvn dependency:go-offline -B

# Copy the project source
COPY src src

# Package the application
RUN mvn clean package -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

#### Stage 2: A minimal docker image with command to run the app
FROM openjdk:8-jdk-slim

ARG DEPENDENCY=/app/target/dependency

# Copy project dependencies from the build stage
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app

RUN apt-get update \
 && apt-get install --assume-yes apt-utils \
 && apt-get install --assume-yes software-properties-common \
 && apt-get install --assume-yes dbus \
 && apt-get install --assume-yes glib-networking \
 && apt-get install --assume-yes libnih-dbus-dev \
 && apt-get install --assume-yes dconf-cli \
 && apt-get install --assume-yes fontconfig


ENTRYPOINT ["java","-cp","app:app/lib/*","ru.itis.javalab.ConsumerXlsxApplication"]
