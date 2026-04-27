//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace Karamem0.Teamtile.Logging;

public static class LoggerExtensions
{

    private static readonly Action<ILogger, string?, Exception?> methodRequestData = LoggerMessage.Define<string?>(
        LogLevel.Debug,
        new EventId(1001),
        "要求データ: {RequestData}"
    );

    public static void MethodRequestData(
        this ILogger logger,
        object? data = null,
        Exception? exception = null
    )
    {
        methodRequestData.Invoke(
            logger,
            JsonSerializer
                .Serialize(data)
                .Replace("\r", "")
                .Replace("\n", ""),
            exception
        );
    }

    private static readonly Action<ILogger, string?, Exception?> methodResponseData = LoggerMessage.Define<string?>(
        LogLevel.Debug,
        new EventId(1002),
        "応答データ: {ResponseData}"
    );

    public static void MethodResponseData(
        this ILogger logger,
        object? data = null,
        Exception? exception = null
    )
    {
        methodResponseData.Invoke(
            logger,
            JsonSerializer
                .Serialize(data)
                .Replace("\r", "")
                .Replace("\n", ""),
            exception
        );
    }

    private static readonly Action<ILogger, Exception?> methodExecuting = LoggerMessage.Define(
        LogLevel.Information,
        new EventId(2001),
        "メソッドを実行しています。"
    );

    public static void MethodExecuting(this ILogger logger, Exception? exception = null)
    {
        methodExecuting.Invoke(logger, exception);
    }

    private static readonly Action<ILogger, Exception?> methodExecuted = LoggerMessage.Define(
        LogLevel.Information,
        new EventId(2002),
        "メソッドを実行しました。"
    );

    public static void MethodExecuted(this ILogger logger, Exception? exception = null)
    {
        methodExecuted.Invoke(logger, exception);
    }

    private static readonly Action<ILogger, Exception?> methodFailed = LoggerMessage.Define(
        LogLevel.Error,
        new EventId(4001),
        "メソッドの実行に失敗しました。"
    );

    public static void MethodFailed(this ILogger logger, Exception? exception = null)
    {
        methodFailed.Invoke(logger, exception);
    }

    private static readonly Action<ILogger, Exception?> authorizationFailed = LoggerMessage.Define(
        LogLevel.Error,
        new EventId(4002),
        "認証に失敗しました。"
    );

    public static void AuthorizationFailed(this ILogger logger, Exception? exception = null)
    {
        authorizationFailed.Invoke(logger, exception);
    }

    private static readonly Action<ILogger, Exception?> unhandledErrorOccurred = LoggerMessage.Define(
        LogLevel.Error,
        new EventId(5001),
        "予期しない問題が発生しました。"
    );

    public static void UnhandledErrorOccurred(this ILogger logger, Exception? exception = null)
    {
        unhandledErrorOccurred.Invoke(logger, exception);
    }

}
