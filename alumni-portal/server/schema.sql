-- ============================================================
-- Alumni Portal Database Schema
-- MySQL 8.0+ | Character Set: utf8mb4
-- Auto-generated from backend/models.py (SQLAlchemy models)
-- ============================================================

CREATE DATABASE IF NOT EXISTS `alumni_portal_db`
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE `alumni_portal_db`;

-- -----------------------------------------------------------
-- Alumni (registered users)
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `alumni` (
    `id`            BIGINT       NOT NULL,
    `fullName`      VARCHAR(255) NOT NULL,
    `email`         VARCHAR(255) NOT NULL,
    `password`      VARCHAR(255) NOT NULL,
    `school`        VARCHAR(50)  DEFAULT NULL,
    `department`    VARCHAR(255) DEFAULT NULL,
    `batchYear`     VARCHAR(10)  DEFAULT NULL,
    `companyName`   VARCHAR(255) DEFAULT NULL,
    `jobTitle`      VARCHAR(255) DEFAULT NULL,
    `location`      VARCHAR(255) DEFAULT NULL,
    `linkedin`      TEXT         DEFAULT NULL,
    `bio`           TEXT         DEFAULT NULL,
    `salary`        DOUBLE       DEFAULT 0,
    `profile_image` VARCHAR(500) DEFAULT NULL,
    `phoneNumber`   VARCHAR(50)  DEFAULT NULL,
    `timestamp`     VARCHAR(50)  DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_alumni_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- Events
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `events` (
    `id`          BIGINT       NOT NULL,
    `title`       VARCHAR(500) NOT NULL,
    `type`        VARCHAR(100) DEFAULT NULL,
    `dateTime`    VARCHAR(50)  DEFAULT NULL,
    `location`    VARCHAR(500) DEFAULT NULL,
    `description` TEXT         DEFAULT NULL,
    `imageUrl`    VARCHAR(500) DEFAULT NULL,
    `school`      VARCHAR(50)  DEFAULT NULL,
    `timestamp`   VARCHAR(50)  DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- Jobs
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobs` (
    `id`             BIGINT       NOT NULL,
    `jobTitle`       VARCHAR(255) DEFAULT NULL,
    `companyName`    VARCHAR(255) DEFAULT NULL,
    `jobType`        VARCHAR(100) DEFAULT NULL,
    `location`       VARCHAR(255) DEFAULT NULL,
    `jobDescription` TEXT         DEFAULT NULL,
    `applyLink`      VARCHAR(500) DEFAULT NULL,
    `postedBy`       VARCHAR(255) DEFAULT NULL,
    `timestamp`      VARCHAR(50)  DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- Donations
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `donations` (
    `id`        BIGINT       NOT NULL,
    `fullName`  VARCHAR(255) DEFAULT NULL,
    `email`     VARCHAR(255) DEFAULT NULL,
    `amount`    VARCHAR(50)  DEFAULT NULL,
    `purpose`   VARCHAR(255) DEFAULT NULL,
    `message`   TEXT         DEFAULT NULL,
    `timestamp` VARCHAR(50)  DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- Contact Messages
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact_messages` (
    `id`             BIGINT       NOT NULL,
    `fullName`       VARCHAR(255) DEFAULT NULL,
    `organisation`   VARCHAR(255) DEFAULT NULL,
    `designation`    VARCHAR(255) DEFAULT NULL,
    `department`     VARCHAR(255) DEFAULT NULL,
    `officialEmail`  VARCHAR(255) DEFAULT NULL,
    `personalEmail`  VARCHAR(255) DEFAULT NULL,
    `mobileNumber`   VARCHAR(50)  DEFAULT NULL,
    `category`       VARCHAR(100) DEFAULT NULL,
    `message`        TEXT         DEFAULT NULL,
    `attachmentUrl`  VARCHAR(500) DEFAULT NULL,
    `attachmentName` VARCHAR(255) DEFAULT NULL,
    `timestamp`      VARCHAR(50)  DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- Chat Messages
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `messages` (
    `id`         BIGINT       NOT NULL,
    `senderId`   BIGINT       NOT NULL,
    `receiverId` BIGINT       NOT NULL,
    `content`    TEXT         DEFAULT NULL,
    `senderName` VARCHAR(255) DEFAULT NULL,
    `timestamp`  VARCHAR(50)  DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
