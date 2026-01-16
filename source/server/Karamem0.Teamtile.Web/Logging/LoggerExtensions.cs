//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

using Microsoft.Extensions.Logging;
using System.Runtime.CompilerServices;

namespace Karamem0.Teamtile.Logging;

public static class LoggerExtensions
{

    private static readonly Action<ILogger, string?, Exception?> actionExecuting = LoggerMessage.Define<string?>(
        LogLevel.Information,
        new EventId(1001),
        "[{MemberName}] アクションを実行しています。"
    );

    public static void ActionExecuting(
        this ILogger logger,
        [CallerMemberName()] string? memberName = null,
        Exception? exception = null
    )
    {
        actionExecuting.Invoke(
            logger,
            memberName,
            exception
        );
    }

    private static readonly Action<ILogger, string?, Exception?> actionExecuted = LoggerMessage.Define<string?>(
        LogLevel.Information,
        new EventId(1002),
        "[{MemberName}] アクションを実行しました。"
    );

    public static void ActionExecuted(
        this ILogger logger,
        [CallerMemberName()] string? memberName = null,
        Exception? exception = null
    )
    {
        actionExecuted.Invoke(
            logger,
            memberName,
            exception
        );
    }

    private static readonly Action<ILogger, string?, object?, Exception?> actionRequestData = LoggerMessage.Define<string?, object?>(
        LogLevel.Debug,
        new EventId(2001),
        "[{MemberName}] 要求データ: {RequestData}"
    );

    public static void ActionRequestData(
        this ILogger logger,
        [CallerMemberName()] string? memberName = null,
        object? requestData = null,
        Exception? exception = null
    )
    {
        actionRequestData.Invoke(
            logger,
            memberName,
            requestData,
            exception
        );
    }

    private static readonly Action<ILogger, string?, object?, Exception?> actionResponseData = LoggerMessage.Define<string?, object?>(
        LogLevel.Debug,
        new EventId(2002),
        "[{MemberName}] 応答データ: {ResponseData}"
    );

    public static void ActionResponseData(
        this ILogger logger,
        [CallerMemberName()] string? memberName = null,
        object? responseData = null,
        Exception? exception = null
    )
    {
        actionResponseData.Invoke(
            logger,
            memberName,
            responseData,
            exception
        );
    }

    private static readonly Action<ILogger, string?, Exception?> actionFailed = LoggerMessage.Define<string?>(
        LogLevel.Error,
        new EventId(8001),
        "[{MemberName}] アクションの実行に失敗しました。"
    );

    public static void ActionFailed(
        this ILogger logger,
        [CallerMemberName()] string? memberName = null,
        Exception? exception = null
    )
    {
        actionFailed.Invoke(
            logger,
            memberName,
            exception
        );
    }

    private static readonly Action<ILogger, string?, Exception?> unhandledErrorOccurred = LoggerMessage.Define<string?>(
        LogLevel.Error,
        new EventId(9001),
        "[{MemberName}] 予期しない問題が発生しました。"
    );

    public static void UnhandledErrorOccurred(
        this ILogger logger,
        [CallerMemberName()] string? memberName = null,
        Exception? exception = null
    )
    {
        unhandledErrorOccurred.Invoke(
            logger,
            memberName,
            exception
        );
    }

}
